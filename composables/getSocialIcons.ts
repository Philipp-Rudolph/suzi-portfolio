// Funktion zum Rendern der Social Media Icons
export const getSocialIcon = (iconName: string) => {
  // Hier könntest du eine vollständige Icon-Bibliothek implementieren
  // Für dieses Beispiel verwenden wir nur eine einfache Switch-Anweisung
  
  // Social Media Icons als Komponenten (vereinfacht)
  const icons = {
    instagram: {
      render() {
        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          width: '24',
          height: '24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round'
        }, [
          h('rect', { x: '2', y: '2', width: '20', height: '20', rx: '5', ry: '5' }),
          h('path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' }),
          h('line', { x1: '17.5', y1: '6.5', x2: '17.51', y2: '6.5' })
        ]);
      }
    },
    vimeo: {
      render() {
        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          width: '24',
          height: '24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round'
        }, [
          h('path', { d: 'M23 6.66C22.91 5.92 22.51 5.01 21.81 4.31C21.11 3.61 20.21 3.2 19.46 3.1C16.79 2.73 12 2.73 12 2.73C12 2.73 7.21 2.73 4.54 3.1C3.79 3.2 2.89 3.61 2.19 4.31C1.49 5.01 1.09 5.92 1 6.66C0.75 8.3 0.75 11.7 0.75 11.7C0.75 11.7 0.75 15.1 1 16.74C1.09 17.48 1.49 18.39 2.19 19.09C2.89 19.79 3.79 20.2 4.54 20.3C7.21 20.67 12 20.67 12 20.67C12 20.67 16.79 20.67 19.46 20.3C20.21 20.2 21.11 19.79 21.81 19.09C22.51 18.39 22.91 17.48 23 16.74C23.25 15.1 23.25 11.7 23.25 11.7C23.25 11.7 23.25 8.3 23 6.66Z' }),
          h('polygon', { points: '9.75 15.27 15.75 11.7 9.75 8.13 9.75 15.27' })
        ]);
      }
    },
    behance: {
      render() {
        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          width: '24',
          height: '24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round'
        }, [
          h('path', { d: 'M22 7h-7v10h7V7zm-7-4H3v18h12V3zm-4 10H7V9.5h4V13z' })
        ]);
      }
    },
    linkedin: {
      render() {
        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          width: '24',
          height: '24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round'
        }, [
          h('path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }),
          h('rect', { x: '2', y: '9', width: '4', height: '12' }),
          h('circle', { cx: '4', cy: '4', r: '2' })
        ]);
      }
    }
  };

  return icons[iconName] || null;
}