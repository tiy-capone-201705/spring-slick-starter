package com.theironyard.slick.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SessionController {

	@RequestMapping("/login")
	public String showLoginForm(Model model) {
		model.addAttribute("name", false);
		return "app";
	}
	
}
