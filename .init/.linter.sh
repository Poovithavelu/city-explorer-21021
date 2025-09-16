#!/bin/bash
cd /home/kavia/workspace/code-generation/city-explorer-21021/city_snapshot_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

