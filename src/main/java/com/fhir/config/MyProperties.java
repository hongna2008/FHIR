package com.fhir.config;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.Properties;

import org.springframework.core.io.support.PropertiesLoaderUtils;

public class MyProperties {
	private static final Properties properties = new Properties();

	static {
		try {
			properties.load(PropertiesLoaderUtils.class.getClassLoader().getResourceAsStream("config.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String getKey(String key) {
		String value = properties.getProperty(key);
		if(value.contains("CLASSPATH:")){
			value = value.replace("CLASSPATH:",URLDecoder.decode(MyProperties.class.getClassLoader().getResource("").getPath()).substring(1));
		}
		return value;
	}
}
