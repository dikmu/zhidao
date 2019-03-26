package me.zhucai.rest;

import me.zhucai.bean.Book;
import me.zhucai.localepub.EpubMeta;
import me.zhucai.mapper.BookMapper;
import me.zhucai.util.ConstantUtil;
import me.zhucai.util.StringUtil;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//@RequestMapping("/db")
public class ReadTotalToDB {

	int GlobalIndex = 1;//Book ID
	File or;
	File[] files;

	@Autowired
	BookMapper bookMapper;

	@PostMapping()
	@RequestMapping("/readTotal2DB")
	public String readTotal2DB() throws Exception {
		List<String> FilterNames = new ArrayList();
		//获取数据库中所有已有book的uuid
		List<Book> bookIdAndTitleList = bookMapper.selectAllIdAndTitles();
		for (Book b : bookIdAndTitleList) {
			System.out.println(b.getTitle());
			FilterNames.add(b.getTitle());
		}
		System.out.println("FilterNames read Names :" + bookIdAndTitleList.size());
		//迭代所有Book
		iteratorCalibreLib(ConstantUtil.LOCAL_EPUB_LIB_DIR, FilterNames);
		return "ok";
	}

	public static void main(String[] args) {
		try {
			new ReadTotalToDB().readTotal2DB();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 解析opf文件，即calibre的meta文件
	 *
	 * @return EpubMeta对象
	 * @throws DocumentException
	 */
	public EpubMeta opf2EpubMeta(File file, List<String> FilterNames) throws DocumentException {
		EpubMeta epubMeta = new EpubMeta();
		SAXReader reader = new SAXReader();
		epubMeta.setDirPath(file.getParentFile().getAbsolutePath());
		epubMeta.setFileName(getTxtFileName(file.getParentFile()));
		Document document = reader.read(file);
		Element root = document.getRootElement();
		List<Element> es = root.elements().get(0).elements();
		for (Element e : es) {
			if (e.getName().equals("identifier")) {
				List<Attribute> attrs = e.attributes();
				for (Attribute attr : attrs) {
					if (attr.getValue().equals("calibre_id")) {
						epubMeta.setCalibreId(Long.parseLong(e.getStringValue()));
					} else if (attr.getValue().equals("MOBI-ASIN")) {
						epubMeta.setMobiAsin(e.getStringValue());
					} else if (attr.getValue().equals("uuid_id")) {
						epubMeta.setUuid(e.getStringValue());
					} else if (attr.getValue().equals("ISBN")) {
						epubMeta.setIsbn(e.getStringValue());
					} else if (attr.getValue().equals("ASIN")) {
						epubMeta.setAsin(e.getStringValue());
					}
				}
			}
			if (e.getName().equals("title")) {
				epubMeta.setTitle(e.getStringValue());
			}
			//不处理数据库中已存在的Book
			if (FilterNames.indexOf(epubMeta.getTitle()) != -1) {
				System.out.println("跳过" + epubMeta.getCalibreId());
				return null;
			}
			if (e.getName().equals("creator")) {
				epubMeta.addCreator(e.getStringValue());
			}
			if (e.getName().equals("date")) {
				try {
					String s = e.getStringValue();
					s = s.substring(0, s.indexOf("T"));
					epubMeta.setDate(new SimpleDateFormat("yyyy-MM-dd").parse(s));
				} catch (ParseException e1) {
					e1.printStackTrace();
				}
			}
			if (e.getName().equals("language")) {
				epubMeta.setLanguage(e.getStringValue());
			}
			if (e.getName().equals("description")) {
				String s = StringUtil.delHTMLTag(e.getStringValue());
				if (s.length() > 10) {
					epubMeta.setDescription(s);
				}
			}
		}
		return epubMeta;
	}


	/**
	 * 获取同目录下txt文件的名称
	 *
	 * @param dirFile
	 * @return
	 */
	private String getTxtFileName(File dirFile) {
		File[] files = dirFile.listFiles();
		for (File file : files) {
			if (file.isFile() && file.getName().indexOf(".txt") != -1) {
				return file.getName().replaceAll(".txt", "");
			}
		}
		return null;
	}

	public static boolean flag = false;


	/**
	 * 顺序处理所有epub
	 */
	public void iteratorCalibreLib(String dir, List<String> FilterNames) throws Exception {
		Map map = new HashMap();
		try {
			or = new File(dir);
			files = or.listFiles();
			if (files != null) {
				for (File file : files) {
					if (file.isFile() && file.getName().indexOf(".opf") != -1) {
						EpubMeta epubMeta = opf2EpubMeta(file, FilterNames);
						if (epubMeta == null) {
							continue;
						}
						//开关
						//						if (epubMeta.getUuid().equals("7b4a99fc-0fcd-412e-aa4e-afc3c9f83fcb")) {
						//							flag = true;
						//						}
						//						if (!flag) {
						//							continue;
						//						}
						//
						System.out.println(epubMeta);

						Book book = new Book();
						book.setUuid(epubMeta.getUuid());

						if (epubMeta.getTitle().length() > 499) {
							book.setTitle(epubMeta.getTitle().substring(0, 499));
						} else {
							book.setTitle(epubMeta.getTitle());
						}
						book.setDownload("Y");
						book.setDescription(epubMeta.getDescription());
						book.setPath(epubMeta.getRelatedPath().replace(ConstantUtil.LOCAL_EPUB_LIB_DIR + "\\", "")
								.replaceAll("\\\\", "/"));
						book.setFilename(epubMeta.getFileName());
						try {
							bookMapper.insert(book);
						} catch (Exception e) {
							e.printStackTrace();
						}
						//
					} else if (file.isDirectory()) {
						iteratorCalibreLib(file.getAbsolutePath(), FilterNames);
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public long getTextWordCount(EpubMeta epubMeta, String word) throws Exception {
		File txtFile = new File(epubMeta.getTxtPath());
		boolean hasTxt = false;
		if (txtFile.exists()) {
			//获取正文
			BufferedReader br = new BufferedReader(new FileReader(txtFile));
			try {
				StringBuilder sb = new StringBuilder();
				String line = br.readLine();
				while (line != null) {
					sb.append(line);
					sb.append(System.lineSeparator());
					line = br.readLine();
				}
				String content = sb.toString();
				return content.split(word).length;
			} finally {
				br.close();
			}
		} else {
			System.out.println("找不到txt");
		}
		return 0;
	}


}
