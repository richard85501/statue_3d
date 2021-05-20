// Three.js - Load .OBJ ?
// from https://threejsfundamentals.org/threejs/threejs-load-obj-no-materials.html

//3d線上建模
//https://www.vectary.com/dashboard/?teamId=22cf8498-631a-4622-ad03-9903c8fccf80&tab=all

//環境設定 
//https://medium.com/anna-hsaio-%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC%E8%A8%98/js%E5%B0%8F%E5%AD%B8%E5%A0%82-three-js%E7%9A%84%E5%9F%BA%E7%A4%8E%E6%87%89%E7%94%A8part1-e76a025b26f4


import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/MTLLoader.js';

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
  camera.position.set(40,20,40);

  //OrbitControls( object : Camera, domElement : HTMLDOMElement )
  //object: （必须）将要被控制的相机。该相机不允许是其他任何对象的子级，除非该对象是场景自身。
  //domElement: 用于事件监听的HTML元素。
  const controls = new OrbitControls(camera, canvas);
  //https://blog.csdn.net/ithanmang/article/details/82735273
  //設置相機聚焦點
  //相機在FUNCTION裡面默認設置為
  //controls.target = new THREE.Vector3(0, 0, 0);
  //也就是世界的原點
  //所以如果想要穿過原點 可以改變參數
  controls.target.set(0, 0, 0);
  // 更新控制器。必须在摄像机的变换发生任何手动改变后调用
  controls.update();

  //************************以上在做相機 */

  //創建一個新的背景
  const scene = new THREE.Scene();
  //設定背景顏色
  scene.background = new THREE.Color('black');
  //建立坐標軸參考
  let axes = new THREE.AxesHelper(20) // 參數為座標軸長度
  scene.add(axes)

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
      color:0xffff88,
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
    scene.add(mesh);
  }
    //**********以上整個部分都在做地板 */

    // 建立物體
    //創建一個立方體
    const geometry = new THREE.BoxGeometry(1,20,1) // 幾何體
    //創建材質 MeshPhongMaterial屬於一種材質
    const material = new THREE.MeshPhongMaterial({color: 0xfffaaf }) 

  // 材質
    let cube = new THREE.Mesh(geometry, material) // 建立網格物件
    cube.castShadow = true
    cube.receiveShadow = true
    cube.position.set(0, 0, 10)
    scene.add(cube)

  {
    
    //材質模版庫格式（英語：Material Template Library，MTL）是 .OBJ 的配套檔案格式
    const mtlLoader = new MTLLoader();
    mtlLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.mtl', (mtl) => {
      //這行不知道幹嘛用的
      mtl.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', (root) => {
      scene.add(root);});
    });
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

    const color = 0xFFFFFF;
    const intensity = 2;
    //平行光
    const light = new THREE.DirectionalLight(color, intensity);
    //光源照射的位置
    light.position.set(-10, 20, 20)
    light.target.position.set(20, -20, 0);
    // light.shadow.mapSize.width = 2048;
    // light.shadow.mapSize.height = 2048;
    //加上陰影
    light.castShadow = true;
    light.target = cube
    //光源協助工具
    let directionalLightHelper = new THREE.DirectionalLightHelper(light)
    scene.add(directionalLightHelper)

    scene.add(light);
    scene.add(light.target);
    
  }
  //**********以上都在做光源 */


  //-
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      // renderer. setSize (window.innerWidth, window.innerHeight); 
      //設置渲染器的大小為窗口的內寬度，也就是內容區的寬度。
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