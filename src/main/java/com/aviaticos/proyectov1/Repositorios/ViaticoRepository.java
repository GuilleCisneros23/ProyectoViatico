package com.aviaticos.proyectov1.Repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.aviaticos.proyectov1.Entidades.Viatico;
import java.util.List;

@Repository
public interface 
ViaticoRepository extends JpaRepository<Viatico,Long>{
    List<Viatico>findByIdentificacion(String identificacion);
}
