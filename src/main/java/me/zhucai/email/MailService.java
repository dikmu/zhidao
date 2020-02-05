package me.zhucai.email;

public interface MailService {

    void send(String sender, String subject, String content, String receiverList, String fileSrc);

}
