//service/EmailService.java

// service/EmailService.java

// service/EmailService.java

package com.onelife.onelife.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.*;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // 📩 For organ requests (already present)
    public void sendOrganRequestEmail(String to, String subject, String body) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true); // HTML support
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }

    // ✅ Add this method for donor registration confirmation email
    public void sendRegistrationEmail(String to, String subject, String body) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true); // Enable HTML content
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send registration email: " + e.getMessage());
        }
    }
}



