package com.aviaticos.proyectov1.Servicios;
import com.aviaticos.proyectov1.Entidades.Viatico;
import com.aviaticos.proyectov1.Repositorios.ViaticoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ViaticoServicio {

    @Autowired
    private ViaticoRepository viaticoRepo;

    //Registro de viaticos en base de datos
    public Viatico nuevoViatico(Viatico viatico){
        Date hoy = new Date();
        Long diferenciaMillis = hoy.getTime() - viatico.getFecha_registro().getTime();
        Long diferenciaDias = diferenciaMillis / (1000 * 60 * 60 * 24);

        if(diferenciaDias < hoy.getTime() || diferenciaDias > 90){
            throw new IllegalArgumentException("Fecha de ingreso invalida, Debe ser entre 90 días atrás y hoy...");
        }
        
        return viaticoRepo.save(viatico);
    }

    //Obtención de todos los viaticos
    public List<Viatico> getViaticos(){
        return viaticoRepo.findAll();
    }

    //Obtención de un viatico por su ID
    public Optional<Viatico> getViaticosByID(Long ID){
        return viaticoRepo.findById(ID);
    }
  
}
