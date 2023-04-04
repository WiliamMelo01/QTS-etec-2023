export function calculaValores(rendaAnual) {
  let aliquota = 0;
  if (rendaAnual <= 22847.76) {
    return [0, 0];
  } else if (rendaAnual >= 22847.77 && rendaAnual <= 33919.8) {
    aliquota = 7.5;
    return [aliquota, (rendaAnual / 100) * aliquota];
  } else if (rendaAnual >= 33919.81 && rendaAnual <= 45012.6) {
    aliquota = 15;
    return [aliquota, (rendaAnual / 100) * aliquota];
  } else if (rendaAnual >= 45012.61 && rendaAnual <= 55976.16) {
    aliquota = 22.5;
    return [aliquota, (rendaAnual / 100) * aliquota];
  } else if (rendaAnual > 55976.16) {
    aliquota = 27.5;
    return [aliquota, (rendaAnual / 100) * aliquota];
  }
}
