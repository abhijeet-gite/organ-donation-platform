package com.onelife.onelife.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganRequestDTO {
    private String donorEmail;
    private String requesterName;
    private String requesterEmail;
    private String organNeeded;
    private String message;
}

