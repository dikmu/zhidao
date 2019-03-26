package me.zhucai.util;

import java.io.File;
import java.util.*;

public class FileNameUtil {

	File or;
	File[] files;

	List<String> pathName = new ArrayList<String>();

	List<String> fileList = new ArrayList<>();

	public List<String> getFilesInDir(String dirPath) {
		iteratorPath(dirPath);
		return fileList;
	}

	public List<String> getSortedFilesInDir(String dirPath) {
		List<String> files = getFilesInDir(dirPath);
		Collections.sort(files);
		return files;
	}


	// 用于遍历文件价
	public void iteratorPath(String dir) {
		or = new File(dir);
		files = or.listFiles();
		if (files != null) {
			for (File file : files) {
				if (file.isFile()) {
					fileList.add(file.getName());
				} else if (file.isDirectory()) {
					iteratorPath(file.getAbsolutePath());
				}
			}
		}
	}

	//    /**
	//     * 格式化如下书名：
	//     *  《Kotlin for android Developers》中文翻译_4305138.epub
	//     *  @设计中的设计（校正）1.0_205687.azw3
	//     *  《死亡刻痕》（《分歧者》作者维罗尼卡.罗斯惊世新作，全球同步出版，好莱坞同名电影大片筹拍中）_1652367.azw3
	//     *
	//     *  仅去掉_4305138.epub _1652367.azw3
	//     * @param source
	//     * @return
	//     */
	//    public String getNewBookPureName(String source){
	//        int i_ = source.lastIndexOf("_");
	//        if(i_==-1){
	//            return source;
	//        }
	//        return null;
	//    }

	//    /**
	//     * 去掉扩展名
	//     * @return
	//     */
	//    public static String removeExtName(String source){
	//        int i1 = source.lastIndexOf(".azw3");
	//        Regex regex =new Regex("[0-9]6");
	////        "《Kotlin for android Developers》中文翻译_4305138.epub";
	//        boolean a=Pattern.compile("_[0-9]6\\.[azw|azw3|epub]").matcher("_123456.epub").find();
	//        System.out.println(a);
	//        return null;
	//    }

	/**
	 * 输出所有不能被转换txt格式的电纸书名字
	 * 从临时目录：E:\common\Calibre_LiB_Book
	 * @param args
	 */
	public static void main(String[] args) {
		List<String> names = new FileNameUtil().getFilesInDir("E:\\common\\Calibre_LiB_Book");
		Set<String> set = new HashSet<>();
		for (String n : names) {
			set.add(n);
		}
		StringBuffer stringBuffer = new StringBuffer();
		for (String s : set) {
			stringBuffer.append(s + "||");
		}
		String out = stringBuffer.toString().replaceAll(".azw3", "").replaceAll(".epub", "").replaceAll(".azw", "")
				.replaceAll(".mobi", "").replaceAll(".txt", "");
		System.out.println(out);
	}

}
