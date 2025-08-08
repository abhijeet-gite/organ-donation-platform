//controller/DonorController.java
// controller/DonorController.java

package com.onelife.onelife.controller;

import com.onelife.onelife.dto.DonorRequestDTO;
import com.onelife.onelife.dto.OrganRequestDTO;
import com.onelife.onelife.model.Donor;
import com.onelife.onelife.model.OrganRequest;
import com.onelife.onelife.service.DonorService;
import com.onelife.onelife.service.EmailService;
import com.onelife.onelife.service.OrganRequestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "*")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OrganRequestService organRequestService;

    // ✅ Register a donor and send email
    @PostMapping
    public ResponseEntity<Donor> registerDonor(@RequestBody DonorRequestDTO dto) {
        Donor savedDonor = donorService.registerDonor(dto);

        // Send confirmation email
        String subject = "Thank You for Registering as a Donor - OneLife";
        String body = "<h3>Thank You, " + savedDonor.getFullName() + "!</h3>" +
                "<p>We appreciate your willingness to donate your organ(s). Your contribution can save lives.</p>" +
                "<p><strong>Details:</strong></p>" +
                "<ul>" +
                "<li>Blood Group: " + savedDonor.getBloodGroup() + "</li>" +
                "<li>City: " + savedDonor.getCity() + "</li>" +
                "<li>Phone: " + savedDonor.getPhone() + "</li>" +
                "</ul>" +
                "<p>We will contact you when needed.</p>" +
                "<p>Regards,<br/>OneLife Team</p>";

        emailService.sendRegistrationEmail(savedDonor.getEmail(), subject, body);

        return ResponseEntity.ok(savedDonor);
    }

    // ✅ Get all donors
    @GetMapping
    public ResponseEntity<List<Donor>> getAllDonors() {
        return ResponseEntity.ok(donorService.getAllDonors());
    }

    // ✅ Search donors with filters
    @GetMapping("/search")
    public ResponseEntity<List<Donor>> searchDonors(
            @RequestParam(required = false) String bloodGroup,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String organ,
            @RequestParam(required = false) Boolean available
    ) {
        List<Donor> donors = donorService.searchDonors(bloodGroup, city, state, organ, available);
        return ResponseEntity.ok(donors);
    }

    // ✅ Get all organ requests
    @GetMapping("/organ-requests")
    public ResponseEntity<List<OrganRequest>> getOrganRequests() {
        return ResponseEntity.ok(organRequestService.getAllRequests());
    }

    // ✅ Get donor by ID
    @GetMapping("/{id}")
    public ResponseEntity<Donor> getDonorById(@PathVariable Long id) {
        Donor donor = donorService.getDonorById(id);
        if (donor != null) {
            return ResponseEntity.ok(donor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Get donor count by availability
    @GetMapping("/analytics/count-by-availability")
    public ResponseEntity<Long> countDonors(@RequestParam boolean available) {
        long count = donorService.countByAvailability(available);
        return ResponseEntity.ok(count);
    }
}






