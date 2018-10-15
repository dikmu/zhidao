package me.zhucai.zhidao.localepub;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EpubMeta {

    private Long calibreId;

    private String uuid;

    private String title;

    private List<String> creators;

    private Date date;

    private String mobiAsin;

    private String language;

    private String dirPath;

    private String txtPath;

    private String fileName;

    private String isbn;

    private String asin;

    private String description;

    private String contentMD5;

    public boolean addCreator(String creator) {
        if (creators == null) {
            creators = new ArrayList<String>();
        }
        return creators.add(creator);
    }

    public String getAllCreator() {
        return creators.toString().substring(1, creators.toString().length() - 1);
    }

    public Long getCalibreId() {
        return calibreId;
    }

    public void setCalibreId(Long calibreId) {
        this.calibreId = calibreId;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getCreators() {
        return creators;
    }

    public void setCreators(List<String> creators) {
        this.creators = creators;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMobiAsin() {
        return mobiAsin;
    }

    public void setMobiAsin(String mobiAsin) {
        this.mobiAsin = mobiAsin;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getRelatedPath() {
        System.out.println(dirPath);
        return dirPath;
    }

    public String getDirPath() {
        return dirPath;
    }

    public void setDirPath(String dirPath) {
        this.dirPath = dirPath;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String epubFileName) {
        this.fileName = epubFileName;
    }

    public String getTxtPath() {
        return this.dirPath + "/" + this.fileName + ".txt";
    }

    public void setTxtPath(String txtPath) {
        this.txtPath = txtPath;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getAsin() {
        return asin;
    }

    public void setAsin(String asin) {
        this.asin = asin;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContentMD5() {
        return contentMD5;
    }

    public void setContentMD5(String contentMD5) {
        this.contentMD5 = contentMD5;
    }

    @Override
    public String toString() {
        return "EpubMeta{" +
                "calibreId=" + calibreId +
                ", uuid='" + uuid + '\'' +
                ", title='" + title + '\'' +
                ", creators=" + creators +
                ", date=" + date +
                ", mobiAsin='" + mobiAsin + '\'' +
                ", language='" + language + '\'' +
                ", dirPath='" + dirPath + '\'' +
                ", txtPath='" + getTxtPath() + '\'' +
                ", fileName='" + fileName + '\'' +
                ", isbn='" + isbn + '\'' +
                ", asin='" + asin + '\'' +
                ", description='" + description + '\'' +
                ", contentMD5='" + contentMD5 + '\'' +
                '}';
    }
}
