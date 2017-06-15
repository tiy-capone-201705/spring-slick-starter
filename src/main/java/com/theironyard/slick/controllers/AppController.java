package com.theironyard.slick.controllers;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class AppController {

	@GetMapping("")
	public String showApplication(UsernamePasswordAuthenticationToken token, Model model) {
		String name = token.getName();
		model.addAttribute("name", name);
		return "app";
	}
	
}
