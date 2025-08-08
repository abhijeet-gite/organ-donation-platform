//service/DonorService.java

package com.onelife.onelife.service;

import com.onelife.onelife.dto.DonorRequestDTO;
import com.onelife.onelife.dto.OrganRequestDTO;
import com.onelife.onelife.model.Donor;
import com.onelife.onelife.model.OrganRequest;
import com.onelife.onelife.repository.DonorRepository;
import com.onelife.onelife.repository.OrganRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private OrganRequestRepository organRequestRepository;

    @Autowired
    private JavaMailSender mailSender;

    // 1. Register new donor
    public Donor registerDonor(DonorRequestDTO dto) {
        Donor donor = Donor.builder()
                .fullName(dto.getFullName())
                .age(dto.getAge())
                .bloodGroup(dto.getBloodGroup())
                .organs(dto.getOrgans())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .city(dto.getCity())
                .state(dto.getState())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .available(dto.isAvailable())
                .build();

        return donorRepository.save(donor);
    }

    // 2. Get all donors
    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    // 3. Search donors by filters
    public List<Donor> searchDonors(String bloodGroup, String city, String state, String organ, Boolean available) {
        return donorRepository.searchDonors(bloodGroup, city, state, organ, available);
    }

    // 4. Save organ request to DB and send email
    public void sendOrganRequestEmailAndSave(OrganRequestDTO requestDTO) {
        // Save to database
        OrganRequest organRequest = new OrganRequest();
        organRequest.setDonorEmail(requestDTO.getDonorEmail());
        organRequest.setRequesterName(requestDTO.getRequesterName());
        organRequest.setRequesterEmail(requestDTO.getRequesterEmail());
        organRequest.setOrganNeeded(requestDTO.getOrganNeeded());
        organRequest.setMessage(requestDTO.getMessage());
        organRequestRepository.save(organRequest);

        // Send email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(requestDTO.getDonorEmail());
        message.setSubject("Organ Request: " + requestDTO.getOrganNeeded());
        message.setText("Hello,\n\nYou have received a new organ request.\n\n" +
                "Requester Name: " + requestDTO.getRequesterName() + "\n" +
                "Requester Email: " + requestDTO.getRequesterEmail() + "\n" +
                "Organ Needed: " + requestDTO.getOrganNeeded() + "\n" +
                "Message: " + requestDTO.getMessage() + "\n\n" +
                "Please respond if you are available.\n\nThank you!");

        mailSender.send(message);
    }

    // 5. Fetch all organ requests
    public List<OrganRequest> getAllOrganRequests() {
        return organRequestRepository.findAll();
    }

    // ============ SESSION 8: Analytics Methods ============

    // 6. Total Donors Count
    public long getTotalDonors() {
        return donorRepository.count();
    }

    // 7. Available Donors Count
    public long getAvailableDonors() {
        return donorRepository.countByAvailable(true);
    }

    // 8. Donors by Blood Group
    public Map<String, Long> getDonorsByBloodGroup() {
        List<Donor> donors = donorRepository.findAll();
        return donors.stream()
                .collect(Collectors.groupingBy(Donor::getBloodGroup, Collectors.counting()));
    }

    // 9. Donors by Organ
    public Map<String, Long> getDonorsByOrgan() {
        List<Donor> donors = donorRepository.findAll();

        // Collect all organs in a flat list
        return donors.stream()
                .flatMap(d -> d.getOrgans().stream())
                .collect(Collectors.groupingBy(org -> org, Collectors.counting()));
    }

    // 10. Count by availability (for analytics)
    public long countByAvailability(boolean available) {
        return donorRepository.countByAvailable(available);
    }

    // 11. 🔥 Get donor by ID (fix for /api/donors/{id})
    public Donor getDonorById(Long id) {
        return donorRepository.findById(id).orElse(null);
    }
}


    



