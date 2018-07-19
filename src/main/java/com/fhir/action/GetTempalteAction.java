package com.fhir.action;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fhir.config.MyProperties;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class GetTempalteAction {
	@ResponseBody
	@RequestMapping(value = "getTempalte")
	public String getFilesByDir(HttpServletRequest request, HttpServletResponse response) {
		JSONObject result = new JSONObject();
		JSONArray array = new JSONArray();
		File file = new File(MyProperties.getKey("FHIR_TEMPLATE_FILE_PATH"));
		String[] dirNames = file.list();
		for (int i = 0; i < dirNames.length; i++) {
			File f = new File(file.getPath() + File.separatorChar + dirNames[i]);
			String [] fileNames = f.list();
			for (int j = 0; j < fileNames.length; j++) {
				JSONObject line = new JSONObject();
				line.put("Type", dirNames[i]);
				line.put("TemplateName", fileNames[j]);
				array.add(line);
			}
		}
		result.put("data", array);
		return result.toString();
	}
}
