package com.aviaticos.proyectov1.Entidades;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "viaticos")
public class Viatico{

    //Identificador/Llave primaria del registro
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long ID;

    //Fecha del registro 
    @Column(name="fecha_registro",nullable=false)
    private Date fecha_registro;

    //Agente que ingresa el aviatico
    @Column(name="nombre_agente",nullable=false)
    private String agente;

    //Identificación del cliente
    @Column(name="identificación_persona",nullable=false)
    private String identificacion;

    //Motivo del viaje del cliente
    @Column(name="motivo_viaje",nullable=false)
    private String motivo;

    //nombre del cliente
    @Column(name="nombre_cliente",nullable=false)
    private String cliente;

    //Inicio del viaje
    @Column(name="fecha_inicio",nullable=false)
    private Date fechaInicio;

    //Fin del viaje
    @Column(name="fecha_fin",nullable=false)
    private Date fechaFin;

    //Correo de la persona que aprueba los viáticos
    @Column(name="correo_aprobador",nullable=false)
    private String correoAprobador;

    //Numero de archivos encontrados en el zip
    @Column(name="numero_archivos",nullable=false)
    private int numeroArchivos;


////////////////////////////////////////////////////////////////

    //Constructores

    public Viatico(){}


    //Getter y setter de ID
    public void setID(Long ID) { this.ID = ID;}
    public Long getID() {return ID;}


    //Getter y setter de la fecha del registro de aviaticos
    public void setFecha_registro(Date fecha_registro) {this.fecha_registro = fecha_registro;}
    public Date getFecha_registro() {return fecha_registro;}


    //Getter y setter del nombre del agente que registra el aviatico
    public void setAgente(String agente) {this.agente = agente;}
    public String getAgente() {return agente;}


    //Getter y setter del tipo de identificación del cliente
    public void setIdentificacion(String identificacion) {this.identificacion = identificacion;}
    public String getIdentificacion() {return identificacion;}


    //Getter y setter del motivo del viaje
    public void setMotivo(String motivo) {this.motivo = motivo;}
    public String getMotivo() {return motivo;}

    
    //Getter y setter del nombre del cliente
    public void setCliente(String cliente) {this.cliente = cliente;}
    public String getCliente() {return cliente;}


    //Getter y setter de la fecha del inicio
    public void setFechaInicio(Date fechaInicio) { this.fechaInicio = fechaInicio;}
    public Date getFechaInicio() {return fechaInicio;}


    //Getter y setter de la fecha fin del viaje
    public void setFechaFin(Date fechaFin) {this.fechaFin = fechaFin;}
    public Date getFechaFin() {return fechaFin;}


    //Getter y setter del correo del agente que aprueba la liquidación del viatico
    public void setCorreoAprobador(String correoAprobador) {this.correoAprobador = correoAprobador;}
    public String getCorreoAprobador() {return correoAprobador;}


    //Getter y setter del numero de archivos encontrados en el zip
    public void setNumeroArchivos(int numeroArchivos) { this.numeroArchivos = numeroArchivos;}
    public int getNumeroArchivos() {return numeroArchivos;}

}