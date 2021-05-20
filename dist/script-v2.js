// Three.js - Load .OBJ ?
// from https://threejsfundamentals.org/threejs/threejs-load-obj-no-materials.html
//中文基礎教學 https://segmentfault.com/a/1190000012238576?utm_source=sf-similar-article


import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/MTLLoader.js';

var mouse = {
  x: 0,
  y: 0
};

let Plight;

function main() {
  const canvas = document.querySelector('#c');
  //three3d裡面最優先的渲染器
  const renderer = new THREE.WebGLRenderer({canvas});
  // https://segmentfault.com/a/1190000015330360
  //https://blog.csdn.net/qq_24013817/article/details/50410433
  //啟用陰影   陰影需要大量運算，預設為不啟用陰影功能，所以首先繪製器必須啟用陰影功能。
  renderer.shadowMap.enabled = true;

  //************************以下在做相機 */

  //攝像機視錐體垂直視野角度，從視圖的底部到頂部，以角度來表示。默認值是50。
  const fov = 45;
  //攝像機視錐體的長寬比，通常是使用畫布的寬/畫布的高。默認值是1（正方形畫布）。
  const aspect = 1;  // the canvas default
  //攝像機的近端面，默認值是0.1。
  const near = 0.1;
  //far（遠面距離）相機到視景體最遠的距離
  const far = 10000;
  //創建透視相機
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  //透視相機所在的位置 (x,y,z)
  camera.position.set(40,30,60);

  //OrbitControls( object : Camera, domElement : HTMLDOMElement )
  //object: （必须）将要被控制的相机。该相机不允许是其他任何对象的子级，除非该对象是场景自身。
  //domElement: 用于事件监听的HTML元素。
  const controls = new OrbitControls(camera, renderer.domElement);
  //https://blog.csdn.net/ithanmang/article/details/82735273
  //設置相機聚焦點
  //相機在FUNCTION裡面默認設置為
  //controls.target = new THREE.Vector3(0, 0, 0);
  //也就是世界的原點
  //所以如果想要穿過原點 可以改變參數
  controls.target.set(0, 0, 0);
  // controls.autoRotate = true // 啟用自動旋轉 --無用
  // 更新控制器。必须在摄像机的变换发生任何手动改变后调用
  controls.update();

  //************************以上在做相機 */

  //創建一個新的背景
  const scene = new THREE.Scene();
  //設定背景顏色
  scene.background = new THREE.Color('black');
  //建立坐標軸參考
  let axes = new THREE.AxesHelper(20) // 參數為座標軸長度
  // scene.add(axes)     //-(暫時隱藏)

  { 
    //**********以下整個部分都在做地板 */

    //地板大小
    //在 texture.repeat.set() 呈現
    const planeSize = 60;
    //Creates a new TextureLoader.
    const loader = new THREE.TextureLoader();
    // 纹理中图像的平铺，仅有当图像大小（以像素为单位）为2的幂（2、4、8、16、32、64、128、256、512、1024、2048、……）时才起作用。 
    // 宽度、高度无需相等，但每个维度的长度必须都是2的幂。 这是WebGL中的限制，不是由three.js所限制的。
    //格子紋路的地板是由下面這行匯入的圖片造成
    const texture = loader.load('../—Pngtree—hand painted cartoon pikachu red_3969375.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    //10/2=5 所以地板總共會有5*10個圖案
    const repeats = planeSize / 2;
    const repeats1 = planeSize;
    texture.repeat.set(repeats, repeats1);
    //此網址有圖解: https://threejs.org/docs/#api/en/geometries/PlaneGeometry
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    //網址參考:https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
    //網址參考:https://ithelp.ithome.com.tw/articles/10192953
    const planeMat = new THREE.MeshPhongMaterial({
      //這邊匯入地板材質(指定紋理物件)
      // map: texture,                                                        
      //如果純粹輸入某種顏色,就使用下面這個方法
      color:0x696969,
      //side 材質要渲染到物件的(後/裡)面BackSide或是(正/外)面FrontSite
      side: THREE.DoubleSide,
    });
    //https://threejs.org/docs/#api/zh/objects/Mesh
    //new 出一個形狀+外表
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    //加上陰影(目前還沒用)
    // mesh.castShadow = true;
    mesh.receiveShadow = true;
    //地板水平抑或著垂直
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);     //-(暫時隱藏)
  }
    //**********以上整個部分都在做地板 */

    // 建立物體
    //創建一個立方體
    const geometry = new THREE.BoxGeometry(1,2,1) // 幾何體
    //創建材質 MeshPhongMaterial屬於一種材質
    const material = new THREE.MeshPhongMaterial({color: 0xfffaaf }) 

  // 材質
    let cube = new THREE.Mesh(geometry, material) // 建立網格物件
    cube.castShadow = true
    cube.receiveShadow = true
    cube.position.set(5, 0, 10)
    scene.add(cube)  //-(暫時隱藏)

  {
    
    //材質模版庫格式（英語：Material Template Library，MTL）是 .OBJ 的配套檔案格式
    const mtlLoader = new MTLLoader();
    //箭頭函式 function(mtl){}
    mtlLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.mtl', (mtl) => {
      //這行不知道幹嘛用的
      mtl.preload();
      const objLoader = new OBJLoader();
      // objLoader.position.set(0, 0, 0)
      objLoader.setMaterials(mtl);
      objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', (obj) => {
        
        obj.scale.x = .5;
        obj.scale.y = .5;
        obj.scale.z = .5;

        for(mtl in obj.children){
          // console.log('5')
          obj.children[mtl].castShadow = true;
          obj.children[mtl].receiveShadow = true;
        }
        

      scene.add(obj);
      // root.castShadow = true //無法產生陰影
      //移動位置
      obj.position.z =-5;
      obj.position.x =10;

      
      });
    });

    // obj.children[0].scale.set(2, 2, 2);
  }


  {
        //**********以下都在做光源 */

    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensityA = 1;
    //網址參考:https://www.hangge.com/blog/cache/detail_1811.html
    //HemisphereLight 中文 環境光
    //THREE.HemisphereLight(天空照射下來的顏色,地面發出光線的顏色,光源照射的強度default=1)
    // const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    // scene.add(light);                                                        

    const color = 0xFFB366;
    const intensity = 3;
    //平行光
    //new THREE.DirectionalLight(color, intensity,distance,decay);
    let light = new THREE.DirectionalLight(color, intensity);
    console.log(light)
    //光源所在的位置
    light.position.set(-30, 10, 5)
    // light.target.position.set(20, -20, 0);
    //控制照射的範圍
    light.shadow.camera.near = 5; //产生阴影的最近距离
    light.shadow.camera.far = 100; //产生阴影的最远距离
    light.shadow.camera.left = -30; //产生阴影距离位置的最左边位置
    light.shadow.camera.right = 30; //最右边
    light.shadow.camera.top = 30; //最上边
    light.shadow.camera.bottom = -30;
    // light.shadow.mapSize.width = 2048;
    // light.shadow.mapSize.height = 2048;
    //加上陰影
    light.castShadow = true;
    // light.target = cube
    //光源協助工具
    let directionalLightHelper = new THREE.DirectionalLightHelper(light)
    // scene.add(directionalLightHelper)

    // scene.add(light);
    scene.add(light.target);
    //----------------------- 點光源
    Plight = new THREE.PointLight(0xffffff);
    Plight.position.set(0, 5, 5);
    Plight.castShadow = true;
    scene.add(Plight);

    let PointLight = new THREE.PointLightHelper(Plight)
    // scene.add(PointLight)

    document.addEventListener('mousemove', onMouseMove, false);
  }
  //**********以上都在做光源 */

  //------以下滑鼠移動 -未知
  function onMouseMove(event) {

    //https://ithelp.ithome.com.tw/articles/10198999
    // Update the mouse variable
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    // Make the sphere follow the mouse
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    // mouseMesh.position.copy(pos);
  
    Plight.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z + 2));
  };
  //------以上滑鼠移動

  //-
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
  //- 
  function render() {

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();