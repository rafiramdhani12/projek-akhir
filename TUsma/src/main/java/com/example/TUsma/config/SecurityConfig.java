package com.example.TUsma.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.TUsma.utils.JwtFilter;

@Configuration
public class SecurityConfig {
    @Bean
    public FilterRegistrationBean<JwtFilter> jwtFilter(){
        FilterRegistrationBean<JwtFilter> registrationBean = new FilterRegistrationBean<>();
    
    
        registrationBean.setFilter(new JwtFilter());
        registrationBean.addUrlPatterns(""); // hanya endpoint siswa yg dilindungi
    
        return registrationBean;
    
    }

  
}
