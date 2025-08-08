// service/OrganRequestService.java

package com.onelife.onelife.service;

import com.onelife.onelife.dto.OrganRequestDTO;
import com.onelife.onelife.model.OrganRequest;
import com.onelife.onelife.repository.OrganRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganRequestService {

    @Autowired
    private OrganRequestRepository organRequestRepository;

    // ✅ Save organ request
    public OrganRequest saveOrganRequest(OrganRequestDTO dto) {
        OrganRequest request = OrganRequest.builder()
                .donorEmail(dto.getDonorEmail())
                .requesterName(dto.getRequesterName())
                .requesterEmail(dto.getRequesterEmail())
                .organNeeded(dto.getOrganNeeded())
                .message(dto.getMessage())
                .requestedDate(java.time.LocalDate.now())
                .build();

        return organRequestRepository.save(request);
    }

    // ✅ New: Get all organ requests
    public List<OrganRequest> getAllRequests() {
        return organRequestRepository.findAll();
    }
}


