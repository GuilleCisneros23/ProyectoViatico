package com.aviaticos.proyectov1.Repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.aviaticos.proyectov1.Entidades.Viatico;

@Repository
public interface 
ViaticoRepository extends JpaRepository<Viatico,Long>{
}
