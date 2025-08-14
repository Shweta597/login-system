package com.shwetashaw.loginsystem.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Column(nullable=false, length=60)
    private String firstName;

    @Column(nullable=false, length=60)
    private String lastName;

    @Id@Column(nullable=false, unique=true, length=120)
    private String email;

    @Column(nullable=false, length=120)
    private String password;

    public User() {
    }
    
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "UserDetails [email=" + email + ", firstName=" + firstName + ", lastName=" + lastName + ", password="
                + password + "]";
    }


    
}
