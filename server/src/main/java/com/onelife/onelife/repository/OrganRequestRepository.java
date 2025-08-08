// repository/OrganRequestRepository.java

package com.onelife.onelife.repository;

import com.onelife.onelife.model.OrganRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganRequestRepository extends JpaRepository<OrganRequest, Long> {
}


