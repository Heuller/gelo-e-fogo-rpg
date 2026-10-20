import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { requireOwner, ALLOWED_EMAIL } from './requireOwner';
import { checkRateLimit } from './rateLimiter';

describe('Guardião de Acesso Exclusivo (requireOwner)', () => {
  const originalScenario = process.env.TEST_AUTH_SCENARIO;

  afterEach(() => {
    process.env.TEST_AUTH_SCENARIO = originalScenario;
  });

  it('deve autorizar o proprietário legítimo (ALLOWED_USER_EMAIL)', async () => {
    delete process.env.TEST_AUTH_SCENARIO;
    const res = await requireOwner(true);
    expect(res.authorized).toBe(true);
    expect(res.user?.email).toBe(ALLOWED_EMAIL);
    expect(res.modo).toBe('test_mode');
  });

  it('deve negar e bloquear usuário anônimo (sem sessão)', async () => {
    process.env.TEST_AUTH_SCENARIO = 'anonymous';
    const res = await requireOwner(true);
    expect(res.authorized).toBe(false);
    expect(res.user).toBeNull();
    expect(res.motivo).toContain('Sessão não autenticada');
  });

  it('deve negar e bloquear usuário com e-mail não autorizado (403)', async () => {
    process.env.TEST_AUTH_SCENARIO = 'forbidden_email';
    const res = await requireOwner(true);
    expect(res.authorized).toBe(false);
    expect(res.user?.email).toBe('usurpador@kingslanding.com');
    expect(res.motivo).toContain('não possui autorização da Cidadela');
  });
});

describe('Rate Limiter de Proteção de Custo de IA', () => {
  it('deve permitir requisições dentro do teto e bloquear após limite', () => {
    const testId = `test_ip_${Date.now()}`;
    const maxReq = 3;

    const r1 = checkRateLimit(testId, maxReq, 10000);
    expect(r1.allowed).toBe(true);
    expect(r1.remaining).toBe(2);

    const r2 = checkRateLimit(testId, maxReq, 10000);
    expect(r2.allowed).toBe(true);
    expect(r2.remaining).toBe(1);

    const r3 = checkRateLimit(testId, maxReq, 10000);
    expect(r3.allowed).toBe(true);
    expect(r3.remaining).toBe(0);

    // 4ª tentativa deve ser bloqueada
    const r4 = checkRateLimit(testId, maxReq, 10000);
    expect(r4.allowed).toBe(false);
    expect(r4.remaining).toBe(0);
    expect(r4.resetInMs).toBeGreaterThan(0);
  });
});
