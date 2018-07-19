package com.fhir.action;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hl7.fhir.instance.model.api.IBaseResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fhir.config.MyProperties;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.validation.FhirValidator;
import ca.uhn.fhir.validation.ValidationResult;
import net.sf.json.JSONObject;

@Controller
public class SaveDataAction {
	private static FhirContext ctx = FhirContext.forDstu3();
	
	public static void main(String[] args) {
		StringBuffer sb = new StringBuffer();
		try {
			BufferedReader br = new BufferedReader(
					new InputStreamReader(new FileInputStream(new File("E:\\FHIR\\profile\\us-core-condition.json"))));
			String line = null;
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		FhirValidator validator = ctx.newValidator();
		IBaseResource resource = ctx.newJsonParser().parseResource(sb.toString());
		ValidationResult result = validator.validateWithResult(resource);
		System.out.println(result.isSuccessful());
	}

	@ResponseBody
	@RequestMapping(value = "upload")
	public String upload(HttpServletRequest request, HttpServletResponse response) {
		JSONObject result = new JSONObject();

		String templateName = request.getParameter("templateName");
		String templateType = request.getParameter("templateType");
		String json = request.getParameter("json");

		try {
			FhirValidator validator = ctx.newValidator();
			IBaseResource resource = ctx.newJsonParser().parseResource(json);
			ValidationResult validResult = validator.validateWithResult(resource);
			if (validResult.isSuccessful() == false) {
				return result.toString();
			}
		} catch (Exception e) {
			result.put("error", "Data format is incorrect！\nError Message:\n\t" + e.getMessage());
			return result.toString();
		}
		
		File file = new File(MyProperties.getKey("FHIR_FILE_PATH") + File.separatorChar + templateType
				+ File.separatorChar + templateName + ".json");
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
			result.put("success", true);
		} catch (Exception e) {
			e.printStackTrace();
			result.put("error", e.getMessage());
		}
		return result.toString();
	}
}
