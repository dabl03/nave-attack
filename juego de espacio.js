"uses strict";
function RANDOM( x ){
	return parseInt( Math.random()*x );
}
function D( x ){
	return document.getElementById( x );
}

function CRE( x ){
	return document.createElement( x );
}
function update( obj,dim,medida="px" ){
	obj.style.left=dim.x+medida;
	obj.style.top=dim.y+medida;
	obj.style.width=dim.w+medida;
	obj.style.height=dim.h+medida;
}
class dim2d{
	constructor( x,y,w,h ){
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
	}
	dist( x,y ){
		return Math.sqrt( Math.pow( this.x-x,2)+Math.pow( this.y-y,2 ) );
	}
	dist( dim ){
		return Math.sqrt( Math.pow( this.x-dim.x,2)+Math.pow( this.y-dim.y,2 ) );
	}
};
class persons{
	constructor( dims,life,person,disparo,speed ){
		this.dim=dims;
		this.life=life;
		this.person=person;
		this.disparo=disparo;
		this.speed=speed;
	}
	/*TODO BUSCAR: Buscar la mejor manera de usar clases.*/
	move_all( x,y,medida="px" ){
		/*
		Hacer esto: p.s.top=( this.x=x )+medida es lo mismo en eficiencia  que esto:
		p.s.top=x+medida;
		this.x=x;
		Solo que la primera es mas facil de leer.
		*/
		this.person.style.left=( this.dim.x=x )+medida;
		this.person.style.top=( this.dim.y=y )+medida;
	}
};
class naves extends persons{
	constructor( dims,life,person,person_impart,mostrar_life,disparo,speed,count=0 ){
		super( dims,life,person,disparo,speed );
		this.person_impart=person_impart;
		this.mostrar_life=mostrar_life;
		this.count=count;/*Será el indice de las balas o los disparos.*/
	}
	/*Si se ingresa true o se deja sin parametros entonces significa que la nave impartó con la bala.*/
	imparto_recuperate(impart_=true){
		/*Si ls bala impartó la nave entonces vajamos la vida y intercambiamos la variable person con person_impart.*/
		if ( impart_ ){
			this.person.style.display="none";
			this.person_impart.style.display="block";
			if ( this.life>=0 ){/*Cuestion de seguridad.*/
				this.mostrar_life[ this.life ].style.display="none";
			}
			this.life--;
		}else{
			this.person.style.display="block";
			this.person_impart.style.display="none";
		}
	}
	recuperate( life ){
		this.life=life;
		for ( var i=0; i<this.mostrar_life.length; i++){
			this.mostrar_life[i].style.display="block";
		}
		this.person.style.display="block";
		this.person_impart.style.display="none";
	}
	move_x( x,medicion="px" ){
		this.person.style.left=( this.dim.x=x )+medicion;
		this.person_impart.style.left=x+medicion;
	}
}
class disparos extends persons{
	constructor( dim,life,person,speed ){
		/*this.life lo  ponemos como true porque nos indica si está activado. Se ativa cuando el usuario hace click en la pantalla.*/
		super( dim,life,person,undefined,speed );
	}
	move_menos_y( y,medida="px" ){
		this.person.style.top=( this.dim.y-=y )+medida;
	}
}
class enemigos extends persons{
	constructor( dims,life,person,person_impart,disparo,speed,count=0 ){
		super( dims,life,person,disparo,speed );
		this.person_impart=person_impart;
		this.count=count;/*Será usado para crear el patron del movimiento enemigo.*/
	}
	move_all( x,y,medida="px" ){
		this.person.style.left=( this.dim.x=x )+medida;
		this.person.style.top=( this.dim.y=y )+medida;
		this.person_impart.style.left= x+medida;
		this.person_impart.style.top= y+medida;
	}
	imparto_recuperate(impart_=true){
		/*Si ls bala impartó la nave entonces vajamos la vida y intercambiamos la variable person con person_impart.*/
		if ( impart_ ){
			this.person.style.display="none";
			this.person_impart.style.display="block";
			this.life--;
		}else{
			this.person.style.display="block";
			this.person_impart.style.display="none";
		}
	}
};
