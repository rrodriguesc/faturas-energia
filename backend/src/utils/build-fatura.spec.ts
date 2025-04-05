import { buildFatura } from './build-fatura';

describe('buildFatura', () => {
  it('should correctly compute derived fields', () => {
    const dto = {
      url: 'http://example.com',
      nCliente: '123',
      mesReferencia: new Date('2023-01-01'),
      qtdEnergiaEletrica: 10,
      valorEnergiaEletrica: 20,
      qtdEnergiaSCEEE: 5,
      valorEnergiaSCEEE: 10,
      qtdEnergiaCompensada: 3,
      valorEnergiaCompensada: 5,
      contribuicaoMunicipal: 2,
    };

    const fatura = buildFatura(dto);

    expect(fatura.consumoEnergiaEletrica).toBe(15);
    expect(fatura.valorTotalSemGD).toBe(32);
    expect(fatura.energiaCompensada).toBe(3);
    expect(fatura.economiaGD).toBe(5);
  });
});
