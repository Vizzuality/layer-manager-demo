import { scalePow } from 'd3-scale';

export default {
  'c3075c5a-5567-4b09-bc0d-96ed1673f8b6': (data, w, h, z, params) => {
      const components = 4;
      const exp = z < 11 ? 0.3 + ((z - 3) / 20) : 1;
      const yearStart = params.startDate;
      const yearEnd = params.endDate;
      const imgData = data;

      const myscale = scalePow()
          .exponent(exp)
          .domain([0, 256])
          .range([0, 256]);

      for (let i = 0; i < w; ++i) {
          for (let j = 0; j < h; ++j) {
          const pixelPos = ((j * w) + i) * components;
          const intensity = imgData[pixelPos];
          const yearLoss = 2000 + (imgData[pixelPos + 2]);

          if (yearLoss >= yearStart && yearLoss < yearEnd) {
              imgData[pixelPos] = 220;
              imgData[pixelPos + 1] = (72 - z) + 102 - (3 * myscale(intensity) / z);
              imgData[pixelPos + 2] = (33 - z) + 153 - ((intensity) / z);
              imgData[pixelPos + 3] = z < 13 ? myscale(intensity) : intensity;
          } else {
              imgData[pixelPos + 3] = 0;
          }
          }
      }

      return imgData;
      }
}
