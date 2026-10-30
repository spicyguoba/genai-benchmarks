import test from 'node:test';
import assert from 'node:assert/strict';
import {
  USER_INITIAL_AA_KEY,
  DEFAULT_SETTINGS,
  getAppSettings,
  saveAppSettings,
  verifyArtificialAnalysisKey,
  verifyHuggingFaceKey
} from './appSettings';

test('appSettings: has user Artificial Analysis key configured as default', () => {
  assert.equal(USER_INITIAL_AA_KEY, 'aa_UuIKRhUvbjBPscLnmtwdpTAMlpmmsxZo');
  assert.equal(DEFAULT_SETTINGS.artificialAnalysisApiKey, 'aa_UuIKRhUvbjBPscLnmtwdpTAMlpmmsxZo');
  assert.equal(DEFAULT_SETTINGS.huggingFaceApiKey, '');
});

test('appSettings: getAppSettings returns default settings in non-browser environment', () => {
  const settings = getAppSettings();
  assert.equal(settings.artificialAnalysisApiKey, 'aa_UuIKRhUvbjBPscLnmtwdpTAMlpmmsxZo');
  assert.equal(settings.huggingFaceApiKey, '');
  assert.equal(settings.enableLiveProbes, true);
});

test('appSettings: saveAppSettings merges partial updates cleanly', () => {
  const updated = saveAppSettings({ huggingFaceApiKey: 'hf_testToken123456789' });
  assert.equal(updated.huggingFaceApiKey, 'hf_testToken123456789');
  assert.equal(updated.artificialAnalysisApiKey, 'aa_UuIKRhUvbjBPscLnmtwdpTAMlpmmsxZo');
});

test('appSettings: verifyArtificialAnalysisKey handles empty key gracefully', async () => {
  const result = await verifyArtificialAnalysisKey('');
  assert.equal(result.valid, false);
  assert.equal(result.status, 'empty');
  assert.match(result.message, /No Artificial Analysis API key provided/i);
});

test('appSettings: verifyHuggingFaceKey handles empty key gracefully', async () => {
  const result = await verifyHuggingFaceKey('');
  assert.equal(result.valid, false);
  assert.equal(result.status, 'empty');
  assert.match(result.message, /No Hugging Face token provided/i);
});
