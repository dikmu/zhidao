package me.zhucai.localepub;


import com.hazelcast.com.eclipsesource.json.JsonArray;
import com.hazelcast.com.eclipsesource.json.JsonObject;
import me.zhucai.bean.Book;
import me.zhucai.mapper.BookMapper;
import me.zhucai.util.ConstantUtil;
import me.zhucai.util.StringUtil;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.io.*;
import java.util.*;

@RestController
public class LocalEpubWordCountRest {

	@Autowired
	public BookMapper bookMapper;

	/**
	 * 精确匹配入口
	 * http://localhost:8080/wordCount/%E8%A7%92%E5%8C%96%E5%9E%8B%E6%B9%BF%E7%96%B9+%E8%A7%92%E5%8C%96%E6%80%A7%E6%B9%BF%E7%96%B9
	 * http://localhost:8080/wordCount/SearchWord1+SearchWord2
	 * 多个关键词用 + 或 空格 分隔
	 *
	 * @param word
	 * @return
	 * @throws FileNotFoundException
	 */
	@GetMapping(path = "/wordCount/{word}", produces = "text/html")
	public JsonObject wordCount(@PathVariable("word") String word) throws FileNotFoundException {
		long t1 = System.currentTimeMillis();
		System.out.println("wordCount:" + word);
		JsonObject result = new JsonObject();
		if (StringUtil.isBlank(word)) {
			result.set("code", "err");
			result.set("msg", "搜索单词不能为空");
			return result;
		} else if (word.length() < 2) {
			result.set("code", "err");
			result.set("msg", "搜索单词不能太短");
			return result;
		}
		List<Book> books = bookMapper.selectAll();
		System.out.println("Select all books from DB used" + (System.currentTimeMillis() - t1) + "ms");
		String path;
		List<Book> books2 = new ArrayList<>();
		int i = 0;
		for (Book book : books) {
			i++;
			if (i % 1000 == 0) {
				System.out.println("Scan " + i + " books,used " + (System.currentTimeMillis() - t1) + "ms");
				System.out.println("find " + books2.size() + " books");
			}
			path = ConstantUtil.LOCAL_EPUB_LIB_DIR + "\\" + book.getPath() + "\\" + book.getFilename();
			book.setWordCount(wordCountBook(path, word));
			if (book.getWordCount() > 1) {
				books2.add(book);
				System.out.println("find book:" + book.getTitle() + " " + book.getWordCount());
			}
		}
		System.out.println("Scan " + i + " books,used " + (System.currentTimeMillis() - t1) + "ms");
		System.out.println("find " + books2.size() + " books");
		System.out.println("Scan over");
		Collections.sort(books2);
		System.out.println("sort used " + (System.currentTimeMillis() - t1) + "ms");
		Collections.reverse(books2);
		System.out.println("reverse used " + (System.currentTimeMillis() - t1) + "ms");
		//
		JsonArray array = new JsonArray();
		JsonObject jsonObject;
		for (Book book2 : books2) {
			jsonObject = new JsonObject();
			jsonObject.set("Title", book2.getTitle());
			jsonObject.set("WordCount", book2.getWordCount());
			jsonObject.set("Description", book2.getDescription());
			jsonObject.set("Uid", book2.getUuid());
			array.add(jsonObject);
		}
		result.set("code", "ok");
		result.set("data", array);
		result.set("count", books2.size());
		System.out.println(result);
		System.out.println("done work used" + (System.currentTimeMillis() - t1) + "ms");
		return result;
	}


	public long wordCountBook(String path, String word) throws FileNotFoundException {
		File file = new File(path + ".txt");
		if (!file.exists()) {
			System.err.println("File Removed:"+path+".txt");
			return 0;
		}
		//获取正文
		BufferedReader br = new BufferedReader(new FileReader(file));
		try {
			StringBuilder sb = new StringBuilder();
			String line = null;
			line = br.readLine();
			while (line != null) {
				sb.append(line);
				line = br.readLine();
			}
			String content = sb.toString();
			/**
			 * 当有多个关键词时,评分相乘
			 */
			word = word.replaceAll("\\+", " ");
			String[] ss = word.split(" ");
			long mark = 1;
			for (String s : ss) {
				if (content.indexOf(s) != -1) {
					mark = mark * content.split(word).length;
				}
			}
			return mark;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return 0;
	}


	public static int maxcount = 0;
	int GlobalIndex = 1;//Book ID

	RestHighLevelClient client = null;

	File or;
	File[] files;
	public static Set<EpubMeta> EPUB_META_SET = new HashSet<>();

	Set<String> LocalBookSet = new HashSet<>();

	/**
	 * 解析opf文件，即calibre的meta文件
	 *
	 * @return EpubMeta对象
	 * @throws DocumentException
	 */
	public EpubMeta opf2EpubMetaSimple(File file) throws DocumentException {
		EpubMeta epubMeta = new EpubMeta();
		SAXReader reader = new SAXReader();
		epubMeta.setDirPath(file.getParentFile().getAbsolutePath());
		epubMeta.setFileName(getTxtFileName(file.getParentFile()));
		Document document = reader.read(file);
		Element root = document.getRootElement();
		List<Element> es = root.elements().get(0).elements();
		for (Element e : es) {
			if (e.getName().equals("title")) {
				epubMeta.setTitle(e.getStringValue());
			}
			if (e.getName().equals("creator")) {
				epubMeta.addCreator(e.getStringValue());
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


	/**
	 * 顺序处理所有epub
	 */
	public void iteratorCalibreLib(String dir, String word) throws Exception {
		Map map = new HashMap();
		try {
			or = new File(dir);
			files = or.listFiles();
			if (files != null) {
				for (File file : files) {
					if (file.isFile() && file.getName().indexOf(".opf") != -1) {
						EpubMeta epubMeta = opf2EpubMetaSimple(file);
						if (epubMeta == null) {
							GlobalIndex++;
							System.out.println(GlobalIndex);
							long wordCount = getTextWordCount(epubMeta, word);
							if (wordCount == 0) {
								continue;
							}
							map.put(epubMeta.getTitle(), wordCount);
							System.out.println(epubMeta.getTitle() + ":" + wordCount);
						}
					} else if (file.isDirectory()) {
						iteratorCalibreLib(file.getAbsolutePath(), word);
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


	@GetMapping(path = "wordcount/{word}")
	public String run(@PathParam("word") String word) {
		if (StringUtil.isBlank(word)) {
			return "输入非法";
		}
		try {
			iteratorCalibreLib(ConstantUtil.LOCAL_EPUB_LIB_DIR, word);
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				client.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public static void main(String[] args) throws Exception {
		String word = "aa bb+cc-dd".replaceAll("\\+", " ");
		System.out.println(word.split(" ").length);
	}

}
