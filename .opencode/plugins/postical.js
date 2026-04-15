/**
 * Postical plugin for Claude Code / OpenCode.ai
 *
 * Auto-registers skills directory via config hook.
 * No bootstrap injection — skills are discovered and invoked on demand.
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PosticalPlugin = async ({ client, directory }) => {
  const posticalSkillsDir = path.resolve(__dirname, '../../skills');

  return {
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      if (!config.skills.paths.includes(posticalSkillsDir)) {
        config.skills.paths.push(posticalSkillsDir);
      }
    }
  };
};
