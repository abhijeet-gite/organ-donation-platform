package com.onelife.onelife.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonorRequestDTO {

    private String fullName;
    private int age;
    private String bloodGroup;
    private List<String> organs;
    private String email;
    private String phone;
    private String city;
    private String state;
    private double latitude;
    private double longitude;
    private boolean available;
}

