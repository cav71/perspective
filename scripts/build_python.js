/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

const execSync = require("child_process").execSync;

const execute = cmd => execSync(cmd, {stdio: "inherit"});

function docker(image = "emsdk") {
    console.log(`-- Creating ${image} docker image`);
    let cmd = "docker run --rm -it";
    if (process.env.PSP_CPU_COUNT) {
        cmd += ` --cpus="${parseInt(process.env.PSP_CPU_COUNT)}.0"`;
    }
    cmd += ` -v $(pwd):/usr/src/app/python -w /usr/src/app/python perspective/${image}`;
    return cmd;
}

try {
    let cmd = "python3 setup.py build";
    if (process.env.PSP_DOCKER) {
        execute(docker("python") + " " + cmd);
    } else {
        execute(cmd);
    }
} catch (e) {
    process.exit(1);
}
