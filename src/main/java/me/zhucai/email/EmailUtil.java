package me.zhucai.email;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailUtil {

    private static final String EMAIL_REGEX = "^\\s*?(.+)@(.+?)\\s*$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    public static boolean isValidEmail(String email) {
        Matcher emailMatcher = EMAIL_PATTERN.matcher(email);
        if (!emailMatcher.matches()) {
            return false;
        }
        return true;
    }

}
