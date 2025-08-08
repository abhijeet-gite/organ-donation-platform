package com.onelife.onelife.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "donors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Donor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private int age;

    private String bloodGroup;

    @ElementCollection
    private List<String> organs;  // e.g. ["Kidney", "Heart"]

    private String email;

    private String phone;

    private String city;

    private String state;

    private double latitude;

    private double longitude;

    private boolean available;
}

