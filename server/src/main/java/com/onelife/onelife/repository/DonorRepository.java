//repository/DonorRepository.java

package com.onelife.onelife.repository;

import com.onelife.onelife.model.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Long> {

    @Query("SELECT d FROM Donor d WHERE " +
            "(:bloodGroup IS NULL OR d.bloodGroup = :bloodGroup) AND " +
            "(:city IS NULL OR d.city = :city) AND " +
            "(:state IS NULL OR d.state = :state) AND " +
            "(:organ IS NULL OR :organ IN elements(d.organs)) AND " +
            "(:available IS NULL OR d.available = :available)")
    List<Donor> searchDonors(
            @Param("bloodGroup") String bloodGroup,
            @Param("city") String city,
            @Param("state") String state,
            @Param("organ") String organ,
            @Param("available") Boolean available
    );

    // ✅ Count donors based on availability (true = available, false = not available)
    long countByAvailable(boolean available);
}

