"uses strict";
function RANDOM( x ){
	return parseInt( Math.random()*x );
}

function get_element( x ){
	return document.getElementById( x );
}

function create_element( x ){
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
		this.person.style.left=( this.dim.x=x )+medida;
		this.person.style.top=( this.dim.y=y )+medida;
	}
};
class naves extends persons{
	constructor( dims,life,person,mostrar_life,disparo,speed,count=0 ){
		super( dims,life,person,disparo,speed );
		this.mostrar_life=mostrar_life;
		this.count=count;/*Será el indice de las balas o los disparos.*/
	}
	/*Si se ingresa true o se deja sin parametros entonces significa que la nave impartó con la bala.*/
	imparto_recuperate(impart_=true){
		/*Si ls bala impartó la nave entonces vajamos la vida y intercambiamos la variable person con person_impart.*/
		if ( impart_ ){
			this.person.classList.add("nave_attack");
			if ( this.life>=0 ){/*Cuestion de seguridad.*/
				this.mostrar_life[ this.life ].style.display="none";
			}
			this.life--;
		}else{
			this.person.classList.remove("nave_attack");
		}
	}
	recuperate( life ){
		this.life=life;
		for ( let i=0; i<this.mostrar_life.length; i++){
			this.mostrar_life[i].style.display="block";
		}
		if (this.person.classList.contains("nave_attack"))
			this.person.classList.remove("nave_attack");
	}
	move_x( x,medicion="px" ){
		this.person.style.left=( this.dim.x=x )+medicion;
	}
	move_y( y,medicion="px" ){
		this.person.style.top=( this.dim.y=y )+medicion;
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
	constructor( dims,life,class_,disparo,speed,count=0 ){
		super( dims,life,document.createElement("div"),disparo,speed );
		this.class_=class_;
		this.count=count;/*Será usado para crear el patron del movimiento enemigo.*/

		this.person.classList.add(this.class_);//Le damos la clase enemigo para que css se encargue de lo demas.
		
		this.person.appendChild(this.disparo.person);
		update(this.person,this.dim);//Actualizamos las dimensiones.
	}
	move_all( x,y,medida="px" ){
		this.person.style.left=( this.dim.x=x )+medida;
		this.person.style.top=( this.dim.y=y )+medida;
	}
	imparto_recuperate(impart_=true){
		let class_=this.class_+"_impart";
		if ( impart_ ){
			this.person.classList.add(class_);
			this.life--;
			return;
		}
		this.person.classList.remove(class_);
	}
};
