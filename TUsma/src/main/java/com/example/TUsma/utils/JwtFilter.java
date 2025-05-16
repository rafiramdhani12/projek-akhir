package com.example.TUsma.utils;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, java.io.IOException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String authHeader = httpRequest.getHeader("Authorization");
        if(httpRequest.getRequestURI().startsWith("/api/admin/login")){
            chain.doFilter(request, response);
            return;
        }

        if(authHeader != null && authHeader.startsWith("Bearer ")){
            String token = authHeader.substring(7);
            if(JwtUtil.isTokenValid(token)){
                chain.doFilter(request, response); // token valid lanjut
                return;
            }
        }

        // jika tidak valid
        httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        httpResponse.getWriter().write("token tidak valid");
    }
}
