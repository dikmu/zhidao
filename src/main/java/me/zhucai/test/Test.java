package me.zhucai.test;

import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.util.ByteSource;

public class Test {

    public static void main(String[] args) {
        RandomNumberGenerator rng = new SecureRandomNumberGenerator();
        Object salt1 = "123456";//rng.nextBytes();
//        String salt1 = "1234567";
        ByteSource salt2 = ByteSource.Util.bytes(salt1);
        System.out.println(salt2);
        String pass = "123";
        String hashedPasswordBase64 = new Md5Hash(pass, salt2, 100).toBase64();
        //String hashedPasswordBase64 = new Sha256Hash(pass, salt2, 1024).toBase64();
        System.out.println("store pass:" + hashedPasswordBase64 + ",store salt1:" + salt1+",salt2:"+salt2);
//        MTIzNDU2Nw==
//                pass:qPCbHZiSYuCCK8PsiOxJJQ==,salt1:1234567
    }

}
