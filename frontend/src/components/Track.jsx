const Track = ({name, img}) => {
    return (  
        <>
      
                <div className="">
                    <div className="w-56" >
                        <img src={img} alt="" className="object-cover"/>
                    </div>
                    <div>
                        <h2>{name}</h2>
                    </div>
                </div>

        </>
        
        
    );
}
 
export default Track;