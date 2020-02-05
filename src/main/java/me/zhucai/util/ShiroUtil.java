package me.zhucai.util;

import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.util.ByteSource;

import java.util.UUID;

public class ShiroUtil {

    public static final int HASH_ITERATION = 100;

    public static String[] genSaltedMd5Password(String password) {
        String salt1 = UUID.randomUUID().toString().replaceAll("-", "");
        ByteSource salt2 = ByteSource.Util.bytes(salt1);
        String hashedPasswordBase64 = new Md5Hash(password, salt2, HASH_ITERATION).toBase64();
        System.out.println("store pass:" + hashedPasswordBase64 + ",store salt1:" + salt1 + ",salt2:" + salt2);
        return new String[]{hashedPasswordBase64, salt1};
    }



}
