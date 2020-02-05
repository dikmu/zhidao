package me.zhucai.email;

import com.sun.mail.util.MailSSLSocketFactory;
import me.zhucai.mapper.SysConfigMapper;
import me.zhucai.util.MyBase64Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.util.Date;
import java.util.Properties;

@Service("MailService")
public class TencentEnterpriseMailService implements MailService{

    @Autowired
    public SysConfigMapper sysConfigMapper;

    private static String account;
    private static String password;

    @Value("email.host")
    private static String host = "smtp.exmail.qq.com";// 服务器地址
    @Value("email.port")
    private static String port = "465";// 端口
    @Value("email.protocol")
    private static String protocol = "smtp";// 协议

    /**
     * read password from DB
     */
    private void initSysEmailAccountInfo() {
        if (account == null || password == null) {
            account = sysConfigMapper.findByKey("email.account");
            password = sysConfigMapper.findByKey("email.password");
            try {
                password = MyBase64Util.decode(password);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    //初始化参数
    public static Session initProperties() {
        Properties properties = new Properties();
        properties.setProperty("mail.transport.protocol", protocol);
        properties.setProperty("mail.smtp.host", host);
        properties.setProperty("mail.smtp.port", port);
        // 使用smtp身份验证
        properties.put("mail.smtp.auth", "true");
        // 使用SSL,企业邮箱必需 start
        // 开启安全协议
        MailSSLSocketFactory mailSSLSocketFactory = null;
        try {
            mailSSLSocketFactory = new MailSSLSocketFactory();
            mailSSLSocketFactory.setTrustAllHosts(true);
        } catch (GeneralSecurityException e) {
            e.printStackTrace();
        }
        properties.put("mail.smtp.enable", "true");
        properties.put("mail.smtp.ssl.socketFactory", mailSSLSocketFactory);
        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        properties.put("mail.smtp.socketFactory.fallback", "false");
        properties.put("mail.smtp.socketFactory.port", port);
        Session session = Session.getDefaultInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(account, password);
            }
        });
        // 使用SSL,企业邮箱必需 end
        // TODO 显示debug信息 正式环境注释掉
        session.setDebug(true);
        return session;
    }


    // @param sender 发件人别名
    // @param subject 邮件主题
    //@param content 邮件内容
    //@param receiverList 接收者列表,多个接收者之间用","隔开
    //@param fileSrc 附件地址
    public void send(String sender, String subject, String content, String receiverList, String fileSrc) {
        try {
            initSysEmailAccountInfo();
            Session session = initProperties();
            MimeMessage mimeMessage = new MimeMessage(session);
            mimeMessage.setFrom(new InternetAddress(account, sender));// 发件人,可以设置发件人的别名
            // 收件人,多人接收
            InternetAddress[] internetAddressTo = new InternetAddress().parse(receiverList);
            mimeMessage.setRecipients(Message.RecipientType.TO, internetAddressTo);
            // 主题
            mimeMessage.setSubject(subject);
            // 时间
            mimeMessage.setSentDate(new Date());
            // 容器类 附件
            MimeMultipart mimeMultipart = new MimeMultipart();

            // 可以包装文本,图片,附件
            MimeBodyPart bodyPart = new MimeBodyPart();
            // 设置内容
            bodyPart.setContent(content, "text/html; charset=UTF-8");
            mimeMultipart.addBodyPart(bodyPart);
            // 添加图片&附件
            if (fileSrc != null) {
                bodyPart = new MimeBodyPart();
                bodyPart.attachFile(fileSrc);
                mimeMultipart.addBodyPart(bodyPart);
            }
            mimeMessage.setContent(mimeMultipart);
            mimeMessage.saveChanges();
            Transport.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
