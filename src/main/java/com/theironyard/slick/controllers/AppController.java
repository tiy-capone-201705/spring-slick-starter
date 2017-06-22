package com.theironyard.slick.controllers;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/") //only place really serving tuff
public class AppController {

	@GetMapping({"", "messaging/{userName}", "messaging/{userName}/{server}"})
	public String showApplication(UsernamePasswordAuthenticationToken token, Model model) {
		String name = token.getName();
		model.addAttribute("name", name);
		model.addAttribute("error", "");
		return "app";
	}
	
}
