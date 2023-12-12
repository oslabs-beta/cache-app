const express = require('express');
const Redis = require('redis');
const redisClient = Redis.createClient();
const redisController = {};

redisController.getCacheHitsRatio = async (req, res, next) => {
  //connect to local redis instannce
  await redisClient.connect();
  // //set one key to get *some* data to see the performance on
  // await redisClient.set('test', 'hello');
  //response is a giant array of comma and newline separated values, with sections delinated by '# <SectionHeader>',
  const stats = await redisClient.info('stats');
  //separate string into individual metrics and store in array
  const metrics = stats.split('\r\n');
  const cacheHits = metrics.find((str) => str.startsWith('keyspace_hits'));
  const cacheMisses = metrics.find((str) => str.startsWith('keyspace_misses'));
  //   console.log('hits', cacheHits);
  //   console.log('misses', cacheMisses);
  return next();
};

module.exports = redisController;
