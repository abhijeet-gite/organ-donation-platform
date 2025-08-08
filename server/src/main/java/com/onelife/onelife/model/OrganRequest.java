//model/OrganRequest.java

// model/OrganRequest.java

package com.onelife.onelife.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String donorEmail;
    private String requesterName;
    private String requesterEmail;
    private String organNeeded;

    @Column(length = 1000)
    private String message;

     // ✅ Add this line to fix the error
    private LocalDate requestedDate;
}

