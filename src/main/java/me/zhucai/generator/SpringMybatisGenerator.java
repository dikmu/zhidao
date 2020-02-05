package me.zhucai.generator;

import me.zhucai.generator.bean.ColumInfo;
import me.zhucai.generator.bean.TableInfo;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class SpringMybatisGenerator {

    public static void genBean(String fields[]) {

    }

    public static TableInfo readTableInfofromDB(String tablename) {
        String URL = "jdbc:postgresql://localhost:5433/postgres";
        String USER = "postgres";
        String PASSWORD = "system";
        // 1.加载驱动程序
        try {
            Class.forName("org.postgresql.Driver");
            // 2.获得数据库链接
            Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
            // 3.通过数据库的连接操作数据库，实现增删改查（使用Statement类）
            String name = "张三";
            //预编译
            String sql = "SELECT\n" +
                    "    format_type (A .atttypid, A .atttypmod) AS TYPE,\n" +
                    "    A .attname AS NAME\n" +
                    "FROM\n" +
                    "    pg_class AS C,\n" +
                    "    pg_attribute AS A\n" +
                    "WHERE\n" +
                    "    C .relname = '" + tablename + "'\n" +
                    "AND A .attrelid = C .oid\n" +
                    "AND A .attnum > 0;";
            PreparedStatement statement = conn.prepareStatement(sql);
            ResultSet rs = statement.executeQuery();

            TableInfo tableInfo = new TableInfo();
            tableInfo.setName(tablename);
            List<ColumInfo> columInfos = new ArrayList<>();

            // 4.处理数据库的返回结果(使用ResultSet类)
            while (rs.next()) {
                System.out.println(rs.getString("name") + " " + rs.getString("type"));
                ColumInfo columInfo = new ColumInfo();
                columInfo.setName(rs.getString("name"));
                formatColumn(rs.getString("type"), columInfo);
                columInfos.add(columInfo);
            }
            tableInfo.setColumInfos(columInfos);
            // 关闭资源
            conn.close();
            rs.close();
            statement.close();
            return tableInfo;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    private static ColumInfo formatColumn(String columnType, ColumInfo columInfo) {
        columnType = columnType.trim();
        if (columnType.indexOf("character varying(") != -1) {
            int i1 = columnType.indexOf("(");
            int i2 = columnType.indexOf(")");
            String lenStr = columnType.substring(i1 + 1, i2);
            columInfo.setLength(Integer.parseInt(lenStr));
            columInfo.setType("java.lang.String");
        } else if ("character varying".equals(columnType)) {
            columInfo.setLength(-1);
            columInfo.setType("java.lang.String");
        } else if ("bigint".equals(columnType)) {
            columInfo.setLength(-1);
            columInfo.setType("java.lang.Integer");
        } else if ("boolean".equals(columnType)) {
            columInfo.setLength(-1);
            columInfo.setType("java.lang.Boolean");
        } else if ("date".equals(columnType)) {
            columInfo.setLength(-1);
            columInfo.setType("java.lang.Date");
        } else if (columnType.indexOf("timestamp") != -1) {
            columInfo.setLength(-1);
            columInfo.setType("java.lang.Date");
        } else if (columnType.indexOf("time") != -1) {
            columInfo.setLength(-1);
            columInfo.setType("java.lang.Date");
        }else if ("\"char\"".equals(columnType)) {
            columInfo.setLength(-1);
            columInfo.setType("java.lang.String");
        } else {
            throw new RuntimeException("unknown column");
        }
        return columInfo;
    }


    public static void main(String[] args) {
        String fields = "uuid, user_id, username, pay_type, item_id, created_time, description, pay_way";
        TableInfo tableInfo = readTableInfofromDB("buss_payment");
        System.out.println("--------------Generate Bean Fields Begin--------------------------");
        PrintterGenerator.printBeanFields(tableInfo);
        System.out.println("--------------Generate Mapper Fields Begin--------------------------");
        PrintterGenerator.printMappperFields(tableInfo);
    }

}
