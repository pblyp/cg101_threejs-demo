main();

function main() {
    // Заводим сцену и камеру
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Отрисовка происходит через API WebGL. 
    // Задаем разрешение рендерера и прокидываем его на страницу
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Добавляем на сцену три направленных света -- красный, синий и зеленый.
    // C разных сторон от объекта.
    const directionalLightRed = new THREE.DirectionalLight( 0xee0000, 1 );
    directionalLightRed.position.set(0,1,0);
    scene.add( directionalLightRed );
    const directionalLightGreen = new THREE.DirectionalLight( 0x00ee00, 1 );
    directionalLightGreen.position.set(1,0,0);
    scene.add( directionalLightGreen );
    const directionalLightBlue = new THREE.DirectionalLight( 0x0000ee, 1 );
    directionalLightBlue.position.set(0,0,5);
    scene.add( directionalLightBlue );

    let obj = null;

    // Добавляем коробку с базовым lambert-материалом на сцену
    function addCube() {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive:0x000000 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        // Отделим камеру от объекта на сцене
        camera.position.z = 2;
        obj = cube;
    }

    // или не коробку, а чайник (без настроенного CORS/раздачи сервером не работает)
    function addTeapot() {
        let teapot = null;
        const objLoader = new THREE.OBJLoader2();
        objLoader.load('teapot.obj', (event) => {
            teapot = event.detail.loaderRootNode;
            scene.add(teapot);
            teapot.y = -2;
            obj = teapot;
        });
        // Отделим камеру от объекта на сцене
        camera.position.z = 8;
    }
    
    addCube();

    // Коллбэк-функция для отрисовки кадра.
    // Для каждого кадра вращаем объект и просим рендерер отрисовать все то, что попало на камеру из сцены.
    function animate() {
        requestAnimationFrame( animate );
        if (obj) {
            obj.rotation.x += 0.01;
            obj.rotation.z += 0.01;
        }
        renderer.render( scene, camera );
    }
    animate();
}