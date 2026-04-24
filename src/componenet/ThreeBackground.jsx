import { useEffect, useRef } from 'react';

const ThreeBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Dynamically import Three.js to avoid SSR issues
    const initThree = async () => {
      const THREE = await import('three');
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      containerRef.current?.appendChild(renderer.domElement);
      
      // Create a DNA helix effect with torus knots
      const group = new THREE.Group();
      
      // Main central knot
      const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 16, 3, 4);
      const material = new THREE.MeshStandardMaterial({ color: 0x0056D2, roughness: 0.3, metalness: 0.7, emissive: 0x001a4d, emissiveIntensity: 0.5 });
      const knot = new THREE.Mesh(geometry, material);
      group.add(knot);
      
      // Orbiting particles
      const particleCount = 800;
      const particlesGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const radius = 2.5 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particleMaterial = new THREE.PointsMaterial({ color: 0x4a6ee0, size: 0.05, transparent: true, opacity: 0.6 });
      const particles = new THREE.Points(particlesGeometry, particleMaterial);
      group.add(particles);
      
      // Add floating formulas as sprites
      const formulaTexts = ['E=mc²', 'a²+b²=c²', '∫f(x)dx', '∇·E=ρ/ε₀', 'iℏ∂ψ/∂t=Hψ', 'v=u+at', 'F=ma', 'PV=nRT'];
      const formulaSprites = [];
      
      formulaTexts.forEach((text, i) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 128;
        ctx.fillStyle = '#0056D2';
        ctx.font = 'Bold 24px "Courier New", monospace';
        ctx.fillText(text, 20, 50);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.4 });
        const sprite = new THREE.Sprite(material);
        
        const radius = 3.5;
        const angle = (i / formulaTexts.length) * Math.PI * 2;
        sprite.position.x = Math.cos(angle) * radius;
        sprite.position.z = Math.sin(angle) * radius;
        sprite.position.y = Math.sin(angle * 2) * 1.5;
        sprite.scale.set(1.2, 0.6, 1);
        
        group.add(sprite);
        formulaSprites.push(sprite);
      });
      
      // Add ambient and point lights
      const ambientLight = new THREE.AmbientLight(0x404060);
      scene.add(ambientLight);
      
      const pointLight1 = new THREE.PointLight(0x4a6ee0, 1);
      pointLight1.position.set(2, 3, 4);
      scene.add(pointLight1);
      
      const pointLight2 = new THREE.PointLight(0x6366f1, 0.8);
      pointLight2.position.set(-2, 1, 3);
      scene.add(pointLight2);
      
      scene.add(group);
      camera.position.z = 5;
      
      // Animation variables
      let time = 0;
      
      const animate = () => {
        requestAnimationFrame(animate);
        time += 0.005;
        
        knot.rotation.x = time * 0.5;
        knot.rotation.y = time * 0.8;
        knot.rotation.z = time * 0.3;
        
        particles.rotation.y = time * 0.2;
        particles.rotation.x = Math.sin(time * 0.3) * 0.2;
        
        formulaSprites.forEach((sprite, i) => {
          const angle = (i / formulaTexts.length) * Math.PI * 2 + time;
          const radius = 3.8;
          sprite.position.x = Math.cos(angle) * radius;
          sprite.position.z = Math.sin(angle) * radius;
          sprite.position.y = Math.sin(angle * 2) * 1.2;
          sprite.material.opacity = 0.3 + Math.sin(angle * 2) * 0.15;
        });
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
        containerRef.current?.removeChild(renderer.domElement);
      };
    };
    
    initThree();
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};

export default ThreeBackground;