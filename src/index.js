import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';


const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
    
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

const App = () => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  return (
    <div>
      <h1>Ajude o Narutinho a fazer o Kage Bunshin no Jutsu!<br /></h1> 
      <h2>Experimente arrastar ele várias vezes até o retângulo.</h2>
      <br />
     
      <img        
        alt="Narutinho"
        src="https://officialpsds.com/imageview/7w/26/7w2685_large.png?1521316552"
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
        
      <div
        onDrop={(e) => {
          e.preventDefault();
         
          stageRef.current.setPointersPositions(e);
        
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage

          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: '10px solid black' }}
          ref={stageRef}
        >
          <Layer>
            {images.map((image) => {
              return <URLImage image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
