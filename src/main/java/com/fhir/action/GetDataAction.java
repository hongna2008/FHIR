package com.fhir.action;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fhir.config.MyProperties;

import net.sf.json.JSONObject;

@Controller
public class GetDataAction {
	@ResponseBody
	@RequestMapping(value = "getFilesByDir")
	public String getFilesByDir(HttpServletRequest request, HttpServletResponse response) {
		JSONObject result = new JSONObject();
		File file = new File(MyProperties.getKey("FHIR_FILE_PATH"));
		String[] dirNames = file.list();
		for (int i = 0; i < dirNames.length; i++) {
			File f = new File(file.getPath() + File.separatorChar + dirNames[i]);
			String [] fileNames = f.list();
			result.put(dirNames[i], fileNames);
		}
		return result.toString();
	}

	@ResponseBody
	@RequestMapping(value = "getFile")
	public String getFile(HttpServletRequest request, HttpServletResponse response) {
		String dir = request.getParameter("dir");
		String fileName = request.getParameter("fileName");
		StringBuffer sb = new StringBuffer();
		if (StringUtils.isNotEmpty(dir) && StringUtils.isNotEmpty(fileName)) {
			File file = new File(
					MyProperties.getKey("FHIR_FILE_PATH") + File.separatorChar + dir + File.separatorChar + fileName);
			if (file.exists()) {
				try {
					InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "UTF-8");
					BufferedReader br = new BufferedReader(isr);
					String line = null;
					while ((line = br.readLine()) != null) {
						sb.append(line);
					}
					br.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return sb.toString();
	}

	@ResponseBody
	@RequestMapping(value = "removeFile")
	public String removeFile(HttpServletRequest request, HttpServletResponse response) {
		JSONObject result = new JSONObject();
		String dir = request.getParameter("dir");
		String fileName = request.getParameter("fileName");
		result.put("success", true);
		if (StringUtils.isNotEmpty(dir) && StringUtils.isNotEmpty(fileName)) {
			File file = new File(
					MyProperties.getKey("FHIR_FILE_PATH") + File.separatorChar + dir + File.separatorChar + fileName);
			if (file.exists()) {
				if (!file.delete()) {
					result.put("success", false);
				}
			}
		}
		return result.toString();
	}
}
