import { useEffect, useRef } from 'react';

const ThreeBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const initThree = async () => {
      const THREE = await import('three');
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      containerRef.current?.appendChild(renderer.domElement);
      
      const group = new THREE.Group();
      
      // Simple central sphere (smaller)
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshStandardMaterial({ 
        color: 0x0056D2, 
        roughness: 0.3, 
        metalness: 0.6, 
        emissive: 0x0056D2, 
        emissiveIntensity: 0.2
      });
      const centerSphere = new THREE.Mesh(geometry, material);
      group.add(centerSphere);
      
      // Orbiting particles (reduced count for better performance)
      const particleCount = 600;
      const particlesGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const radius = 1.8 + Math.random() * 1.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particleMaterial = new THREE.PointsMaterial({ 
        color: 0x4a8eff, 
        size: 0.03, 
        transparent: true, 
        opacity: 0.4 
      });
      const particles = new THREE.Points(particlesGeometry, particleMaterial);
      group.add(particles);
      
      // Simple rotating ring
      const ringGeometry = new THREE.TorusGeometry(1.2, 0.02, 32, 100);
      const ringMaterial = new THREE.MeshStandardMaterial({ color: 0x0056D2, emissive: 0x0056D2, emissiveIntensity: 0.15 });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
      
      // Lights
      const ambientLight = new THREE.AmbientLight(0x404060);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0x0056D2, 0.8);
      pointLight.position.set(2, 3, 4);
      scene.add(pointLight);
      
      scene.add(group);
      camera.position.z = 4;
      
      let time = 0;
      
      const animate = () => {
        requestAnimationFrame(animate);
        time += 0.01;
        
        centerSphere.rotation.x = time * 0.3;
        centerSphere.rotation.y = time * 0.5;
        
        ring.rotation.z = time * 0.2;
        ring.rotation.y = time * 0.1;
        
        particles.rotation.y = time * 0.05;
        particles.rotation.x = Math.sin(time * 0.2) * 0.1;
        
        renderer.render(scene, camera);
      };
      
      animate();
      
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