package com.fhir.action;

import java.io.File;
import java.io.FileOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fhir.config.MyProperties;

import ca.uhn.fhir.context.FhirContext;
import net.sf.json.JSONObject;

@Controller
public class SaveTemplateAction {
	private static FhirContext ctx = FhirContext.forDstu3();

	@ResponseBody
	@RequestMapping(value = "/template/upload")
	public String upload(HttpServletRequest request, HttpServletResponse response) {
		JSONObject result = new JSONObject();

		String templateName = request.getParameter("templateName");
		String templateType = request.getParameter("templateType");
		String json = request.getParameter("json");

		File file = new File(MyProperties.getKey("FHIR_TEMPLATE_FILE_PATH") + File.separatorChar + templateType
				+ File.separatorChar + templateName + ".js");
		try {
			if (file.exists()) {
				return "The Template Name is used";
			} else {
				file.createNewFile();
			}
			FileOutputStream fos = new FileOutputStream(file);
			byte[] bytes = json.getBytes("UTF-8");
			fos.write(bytes, 0, bytes.length);
			fos.close();
			
			FileUtils.copyFileToDirectory(file,
					new File(new File(MyProperties.getKey("FHIR_TEMPLATE_FILE_PATH")).getParentFile().getParentFile()
							.getParent() + File.separatorChar + "template" + File.separatorChar + templateType));

			result.put("success", true);
		} catch (Exception e) {
			e.printStackTrace();
			result.put("error", e.getMessage());
		}
		return result.toString();
	}
}
