package com.aviaticos.proyectov1.Repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aviaticos.proyectov1.Entidades.Viatico;

/*
 * Interfaz que define los métodos de acceso a la base de datos para la entidad "Viatico".
 * proporciona operaciones CRUD (crear, leer, actualizar, eliminar)
 * y métodos de búsqueda (findByIdentificacion) para trabajar con la base de datos.
 */
@Repository //Interfaz como repositorio de Spring Data JPA.
public interface ViaticoRepository extends JpaRepository<Viatico, Long> {

    // Método para buscar viáticos por la identificación de la persona, conexión con el viaticoServicio.
    List<Viatico> findByIdentificacion(String identificacion);
}
